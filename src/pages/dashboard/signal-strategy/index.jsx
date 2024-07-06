import { SignalStrategyProvider } from "contexts/SignalStrategyContext";
import SignalStrategyList from "page-sections/signal-strategy/page-view/all";
const SignalStrategyPage = () => {
  return (
    <SignalStrategyProvider>
      <SignalStrategyList />
    </SignalStrategyProvider>
  );
};
export default SignalStrategyPage;
