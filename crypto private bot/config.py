import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    API_ID = int(os.getenv("API_ID", "0") or "0")
    API_HASH = os.getenv("API_HASH", "")
    PHONE_NUMBER = os.getenv("PHONE_NUMBER", "")

    # session path WITHOUT extension
    SESSION_PATH = os.getenv("SESSION_PATH", "data/session/user")

    TARGET_CHAT_ID = os.getenv("TARGET_CHAT_ID", "")
    TARGET_TOPIC_ID = os.getenv("TARGET_TOPIC_ID", "")
    WHITELIST_SENDER_IDS = os.getenv("WHITELIST_SENDER_IDS", "")

    BUY_AMOUNT = os.getenv("BUY_AMOUNT", "0.1")
    ARM_TIMEOUT = int(os.getenv("ARM_TIMEOUT", "600"))
    AUTO_OFF_AFTER_SUCCESS = os.getenv("AUTO_OFF_AFTER_SUCCESS", "true").lower() == "true"
    DEBUG_MODE = os.getenv("DEBUG_MODE", "true").lower() == "true"

    PROJECT_NAME = "Telegram CA Auto Buy Bot"
    VERSION = "0.2.0"


def print_config_summary() -> None:
    print("=" * 50)
    print(f"Project       : {Config.PROJECT_NAME}")
    print(f"Version       : {Config.VERSION}")
    print(f"Debug Mode    : {Config.DEBUG_MODE}")
    print(f"Session Path  : {Config.SESSION_PATH}")
    print(f"Target Chat   : {Config.TARGET_CHAT_ID or 'Not set'}")
    print(f"Target Topic  : {Config.TARGET_TOPIC_ID or 'Not set'}")
    print(f"Whitelist     : {Config.WHITELIST_SENDER_IDS or 'Not set'}")
    print(f"Buy Amount    : {Config.BUY_AMOUNT}")
    print(f"Arm Timeout   : {Config.ARM_TIMEOUT}")
    print("=" * 50)