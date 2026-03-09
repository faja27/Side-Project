from __future__ import annotations

from dataclasses import dataclass
from telethon import TelegramClient
from telethon.sessions import SQLiteSession


@dataclass
class TelegramCredentials:
    api_id: int
    api_hash: str
    phone_number: str


def build_client(creds: TelegramCredentials, session_path: str) -> TelegramClient:
    """
    Build Telethon client using a local session file.
    session_path: path WITHOUT extension, e.g. "data/session/user"
    Telethon will create files like: data/session/user.session
    """
    session = SQLiteSession(session_path)
    client = TelegramClient(session, creds.api_id, creds.api_hash)
    return client