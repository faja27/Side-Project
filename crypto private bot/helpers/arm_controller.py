from core.state_manager import BotState


def setup_arm(state: BotState):
    # untuk sekarang auto-arm saat start
    state.arm()