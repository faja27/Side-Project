import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    API_ID = os.getenv("API_ID", "")
    API_HASH = os.getenv("API_HASH", "")
    PHONE_NUMBER = os.getenv("PHONE_NUMBER", "")

    TARGET_CHAT_ID = os.getenv("TARGET_CHAT_ID", "")
    TARGET_TOPIC_ID = os.getenv("TARGET_TOPIC_ID", "")
    WHITELIST_SENDER_IDS = os.getenv("WHITELIST_SENDER_IDS", "")

    BUY_AMOUNT = os.getenv("BUY_AMOUNT", "0.1")
    ARM_TIMEOUT = int(os.getenv("ARM_TIMEOUT", "600"))
    AUTO_OFF_AFTER_SUCCESS = os.getenv("AUTO_OFF_AFTER_SUCCESS", "true").lower() == "true"
    DEBUG_MODE = os.getenv("DEBUG_MODE", "true").lower() == "true"

    PROJECT_NAME = "Telegram CA Auto Buy Bot"
    VERSION = "0.1.0"


def print_config_summary() -> None:
    print("=" * 50)
    print(f"Project       : {Config.PROJECT_NAME}")
    print(f"Version       : {Config.VERSION}")
    print(f"Debug Mode    : {Config.DEBUG_MODE}")
    print(f"Target Chat   : {Config.TARGET_CHAT_ID or 'Not set'}")
    print(f"Target Topic  : {Config.TARGET_TOPIC_ID or 'Not set'}")
    print(f"Whitelist     : {Config.WHITELIST_SENDER_IDS or 'Not set'}")
    print(f"Buy Amount    : {Config.BUY_AMOUNT}")
    print(f"Arm Timeout   : {Config.ARM_TIMEOUT}")
    print("=" * 50)