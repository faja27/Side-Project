from config import Config, print_config_summary


def main() -> None:
    print("Starting project...")
    print_config_summary()
    print("Project structure is ready.")
    print("Next step: implement Telegram client and debug listener.")


if __name__ == "__main__":
    main()