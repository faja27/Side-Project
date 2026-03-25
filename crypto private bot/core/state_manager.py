from __future__ import annotations

import time


class BotState:
    def __init__(self):
        self._armed = False
        self._armed_at = None
        self._last_seen_message_id = 0
        self._triggered = False

    def arm(self):
        self._armed = True
        self._armed_at = time.time()
        self._triggered = False
        print("[STATE] Bot ARMED")

    def disarm(self):
        self._armed = False
        print("[STATE] Bot DISARMED")

    def is_armed(self) -> bool:
        return self._armed

    def mark_triggered(self):
        self._triggered = True
        print("[STATE] Triggered!")

    def has_triggered(self) -> bool:
        return self._triggered

    def set_last_seen(self, msg_id: int):
        self._last_seen_message_id = msg_id

    def get_last_seen(self) -> int:
        return self._last_seen_message_id