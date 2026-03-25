from config import Config


def is_target_chat(chat_id: int) -> bool:
    if not Config.TARGET_CHAT_ID:
        return True
    return str(chat_id) == str(Config.TARGET_CHAT_ID)


def is_target_topic(topic_id: int | None) -> bool:
    if not Config.TARGET_TOPIC_ID:
        return True
    return str(topic_id) == str(Config.TARGET_TOPIC_ID)


def is_whitelisted_sender(sender_id: int | None) -> bool:
    if not Config.WHITELIST_SENDER_IDS:
        return True

    whitelist = [s.strip() for s in Config.WHITELIST_SENDER_IDS.split(",")]

    return str(sender_id) in whitelist


def is_new_message(msg_id: int, last_seen: int) -> bool:
    return msg_id > last_seen