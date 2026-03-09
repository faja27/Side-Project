from config import Config, print_config_summary
from core.telegram_client import TelegramCredentials, build_client
from core.listener import register_debug_listener


async def run() -> None:
    print_config_summary()

    if Config.API_ID == 0 or not Config.API_HASH or not Config.PHONE_NUMBER:
        print("ERROR: Please set API_ID, API_HASH, PHONE_NUMBER in your .env file.")
        return

    creds = TelegramCredentials(
        api_id=Config.API_ID,
        api_hash=Config.API_HASH,
        phone_number=Config.PHONE_NUMBER,
    )

    client = build_client(creds, session_path=Config.SESSION_PATH)

    register_debug_listener(client, only_incoming=True)

    print("\n[Debug Listener] Running... Send a message in any chat to see metadata.")
    print("Press CTRL+C to stop.\n")

    await client.start(phone=Config.PHONE_NUMBER)
    await client.run_until_disconnected()


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())