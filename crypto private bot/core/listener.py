from __future__ import annotations

from telethon import events
from telethon.tl.custom.message import Message

from core.filters import (
    is_target_chat,
    is_target_topic,
    is_whitelisted_sender,
    is_new_message,
)
from core.state_manager import BotState


def _extract_topic_id(msg: Message) -> int | None:
    """
    Extract topic/thread id from message.
    Compatible with multiple Telethon versions.
    """

    # Newer field
    topic_id = getattr(msg, "message_thread_id", None)
    if topic_id:
        return int(topic_id)

    # Fallback
    reply_to = getattr(msg, "reply_to", None)
    if reply_to and getattr(reply_to, "reply_to_msg_id", None):
        return int(reply_to.reply_to_msg_id)

    return None


def register_filtered_listener(client, state: BotState) -> None:
    """
    Listener with:
    - chat filter
    - topic filter
    - sender whitelist
    - state control (armed / triggered)
    """

    @client.on(events.NewMessage(incoming=True))
    async def handler(event: events.NewMessage.Event) -> None:
        msg: Message = event.message

        chat_id = int(event.chat_id) if event.chat_id else 0
        msg_id = int(msg.id)

        sender = await event.get_sender()
        sender_id = getattr(sender, "id", None)

        topic_id = _extract_topic_id(msg)

        # =========================
        # STATE CHECK
        # =========================
        if not state.is_armed():
            return

        if state.has_triggered():
            return

        # =========================
        # FILTER SECTION
        # =========================
        if not is_target_chat(chat_id):
            return

        if not is_target_topic(topic_id):
            return

        if not is_whitelisted_sender(sender_id):
            return

        if not is_new_message(msg_id, state.get_last_seen()):
            return

        # =========================
        # UPDATE STATE
        # =========================
        state.set_last_seen(msg_id)

        # =========================
        # DEBUG OUTPUT (TARGET HIT)
        # =========================
        print("\n🔥 TARGET MESSAGE DETECTED")
        print(f"Chat ID   : {chat_id}")
        print(f"Topic ID  : {topic_id}")
        print(f"Sender ID : {sender_id}")
        print(f"Msg ID    : {msg_id}")
        print(f"Text      : {msg.text}\n")

        # =========================
        # TRIGGER (TEMP)
        # =========================
        state.mark_triggered()

        # NOTE:
        # Hari 4 next day → parse CA di sini
        # Hari 5 next next day → execute buy di sini