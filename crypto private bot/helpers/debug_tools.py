from __future__ import annotations

from dataclasses import dataclass
from typing import Optional


@dataclass
class DebugMessageInfo:
    chat_id: int
    chat_title: Optional[str]
    message_id: int
    sender_id: Optional[int]
    sender_username: Optional[str]
    is_topic_message: bool
    topic_id: Optional[int]
    date_iso: str
    text_preview: str


def shorten_text(text: str, limit: int = 140) -> str:
    text = (text or "").strip().replace("\n", " ")
    return text[:limit] + ("..." if len(text) > limit else "")


def format_debug_info(info: DebugMessageInfo) -> str:
    lines = [
        "=" * 70,
        f"Chat Title       : {info.chat_title or '-'}",
        f"Chat ID          : {info.chat_id}",
        f"Message ID       : {info.message_id}",
        f"Sender ID        : {info.sender_id or '-'}",
        f"Sender Username  : {info.sender_username or '-'}",
        f"Is Topic Message : {info.is_topic_message}",
        f"Topic/Thread ID  : {info.topic_id if info.topic_id is not None else '-'}",
        f"Date             : {info.date_iso}",
        f"Text Preview     : {info.text_preview}",
        "=" * 70,
    ]
    return "\n".join(lines)