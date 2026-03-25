from config import Config, print_config_summary
from core.telegram_client import TelegramCredentials, build_client
from core.listener import register_filtered_listener
from core.state_manager import BotState
from helpers.arm_controller import setup_arm


async def run() -> None:
    print_config_summary()

    # =========================
    # VALIDASI CONFIG
    # =========================
    if Config.API_ID == 0 or not Config.API_HASH or not Config.PHONE_NUMBER:
        print("ERROR: Please set API_ID, API_HASH, PHONE_NUMBER in your .env file.")
        return

    # =========================
    # BUILD TELEGRAM CLIENT
    # =========================
    creds = TelegramCredentials(
        api_id=Config.API_ID,
        api_hash=Config.API_HASH,
        phone_number=Config.PHONE_NUMBER,
    )

    client = build_client(creds, session_path=Config.SESSION_PATH)

    # =========================
    # INIT STATE
    # =========================
    state = BotState()

    # ARM BOT (auto arm sementara)
    setup_arm(state)

    if state.is_armed():
        print("[SYSTEM] Bot is ARMED and ready.\n")
    else:
        print("[SYSTEM] Bot is NOT armed.\n")

    # =========================
    # REGISTER LISTENER
    # =========================
    register_filtered_listener(client, state)

    # =========================
    # RUN INFO
    # =========================
    print("[Filtered Listener] Running...")
    print("Waiting for target message...\n")
    print("Press CTRL+C to stop.\n")

    # =========================
    # START CLIENT
    # =========================
    await client.start(phone=Config.PHONE_NUMBER)
    await client.run_until_disconnected()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())