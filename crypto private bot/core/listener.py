from __future__ import annotations

from telethon import events
from telethon.tl.custom.message import Message

from helpers.debug_tools import DebugMessageInfo, format_debug_info, shorten_text


def _extract_topic_id(msg: Message) -> int | None:
    """
    For forum topics (supergroups with topics), Telethon message may include:
    - msg.reply_to.reply_to_msg_id for topic root (varies)
    - msg.message_thread_id (newer)
    We'll try common fields safely.
    """
    # Newer Telethon versions may have message_thread_id
    topic_id = getattr(msg, "message_thread_id", None)
    if topic_id:
        return int(topic_id)

    # Fallback: some topic messages can be inferred from reply_to
    reply_to = getattr(msg, "reply_to", None)
    if reply_to and getattr(reply_to, "reply_to_msg_id", None):
        return int(reply_to.reply_to_msg_id)

    return None


def register_debug_listener(client, *, only_incoming: bool = True) -> None:
    """
    Register a debug listener that prints metadata for every new message.
    Use this to discover:
    - chat_id
    - topic/thread id
    - sender_id
    """

    @client.on(events.NewMessage(incoming=only_incoming))
    async def handler(event: events.NewMessage.Event) -> None:
        msg: Message = event.message

        chat = await event.get_chat()
        sender = await event.get_sender()

        chat_title = getattr(chat, "title", None)
        chat_id = int(event.chat_id) if event.chat_id is not None else 0

        sender_id = getattr(sender, "id", None)
        sender_username = getattr(sender, "username", None)

        # Topic info
        is_topic_message = bool(getattr(msg, "is_topic_message", False))
        topic_id = _extract_topic_id(msg) if is_topic_message else None

        info = DebugMessageInfo(
            chat_id=chat_id,
            chat_title=chat_title,
            message_id=int(msg.id),
            sender_id=int(sender_id) if sender_id is not None else None,
            sender_username=str(sender_username) if sender_username else None,
            is_topic_message=is_topic_message,
            topic_id=topic_id,
            date_iso=str(msg.date),
            text_preview=shorten_text(msg.message or ""),
        )

        print(format_debug_info(info))