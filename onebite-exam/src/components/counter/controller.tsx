import { Button } from "@/components/ui/button";
import { useDecreaseCount, useIncreaseCount } from "@/store/count";

export default function Controller() {
  // 선택자(Select) 함수를 사용해 특성 요소를 가져올 수 있다.
  // count의 값이 변경되더라도 전체 리랜더링을 막을 수 있음
  const increase = useIncreaseCount();
  const decrease = useDecreaseCount();

  return (
    <div>
      <Button onClick={decrease}>-</Button>
      <Button onClick={increase}>+</Button>
    </div>
  );
}
