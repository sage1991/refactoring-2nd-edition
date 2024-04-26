# Chapter02 - Principles in Refactoring

## 2.1 - Defining Refactoring
> 누군가 "리팩터링 하다가 코드가 깨져서 며칠이나 고생했다" 라고 한다면, 그것은 리팩터링 한것이 아니다.

리팩터링이란, **동작을 보존하는 작은 단계**들을 거져 코드를 수정하고 이러한 단계들을 순차적으로 연결하여 큰 변화를 만들어 내는 일.

## 2.2 - Why Should We Refactor?

### 설계가 좋아진다
규칙적인 리팩터링은 코드의 구조를 지탱 해 준다.  
중복 코드를 제거하면 모든 코드가 언제나 고유한 일을 수행함을 보장 할 수 있고, 이는 바람직한 설계의 핵심이다.

### 소프트웨어를 이해하기 쉬워진다
리팩터링은 코드가 더 잘 읽히게 도와준다. 내 의도를 더 명확하게 전달 하도록 개선 할 수 있다.

### 버그를 쉽게 찾을 수 있다
리팩터링은 코드가 하는 일들이 분명히 드러내 버그를 지나칠 수 없을 정도로 명확하게 만들어준다.

### 개발 속도를 높일 수 있다
리팩터링 하는데 드는 시간으로 전체 개발 속도가 떨어질까봐 걱정 할 수 있지만 그렇지 않다.  
리팩터링을 통해 기존의 설계를 개선해 나감으로서 새로운 기능을 추가할 지점과 어떻게 고칠지를 쉽게 찾을 수 있게 해 준다.


## 2.3 - When Should We Refactor?

### 3의 법칙
1. 처음에는 그냥 한다.
2. 비슷한 일을 두 번째로 하게 되면 일단 계속 진행한다.
3. 비슷한 일을 세 번째 하게 되면 리팩터링 한다.

### 기능을 쉽게 추가하게 만들기
리팩터링 하기 가장 좋은 시점은 코드베이스에 기능을 새로 추가하기 직전이다.

### 코드를 이해하기 쉽게 만들기
리팩터링하면 머리로 이해한 것을 코드에 옮겨 담을 수 있다.  
코드를 분석 할 때 리팩터링을 해 보면 코드가 깔끔하게 정리되어 설계가 눈에 들어오기 시작하고 이는 코드를 깊은 수준까지 이해하게 도와준다.

### 쓰레기 줍기 리팩터링
코드를 파악하는 도중 쓸데없이 복잡한 로직이나 중복 코드를 발견 하였을 때, 간단히 수정 할 수 있는 것은 리팩터링 한다.

### 계획된 리팩터링과 수시로 하는 리팩터링
> 무언가 수정하려 할 때는 먼저 수정하기 쉽게 정돈하고 그런 다음 쉽게 수정하자.

if문 작성 시간을 따로 구분하지 않는 것과 같이 다른 일을 진행 하면서 리팩터링을 함께 진행한다.  
새 기능을 추가하기 쉽도록 코드를 수정 하는것이 그 기능을 가장 빠르게 추가하는 길이다.  

만일 리팩터링에 그동안 소홀했다면 따로 시간을 내서 새 기능을 추가하기 쉽도록 코드베이스를 개선할 필요가 있다.  
이때 리팩터링에 투자한 일주일의 효과를 다음 몇 달 동안 누릴 수도 있다.

하지만 이러한 이유로 계획된 리펙터링을 하는 것은 최소한으로 줄이고 대부분 드러나지 않게 기회가 될 때마다 하는 것이 바람직 하다.

### 오래 걸리는 리팩터링
대규모의 리팩터링 작업이 필요한 경우에도 누구든지 리팩터링 대상 코드와 관련된 작업을 할 때마다 조금씩 개선하는 식으로 주어진 문제를 몇 주에 걸쳐 조금씩 해결 하는 것이 효과적일때가 많다.  
리팩터링이 코드를 깨뜨리지 않는다는 장점을 활용하면 효율적인데, 예를들어 라이브러리 교체의 경우 기존 것과 새 것 모두를 포용하는 추상 인터페이스부터 마련한다.

### 코드 리뷰에 리팩터링 활용하기
흔히 사용하는 PR 모델에서는 코드 작성자 없이 검토가 이루어지므로 그리 효과적이지 않다.  
코드 작성자가 참석해야 맥락을 설명 해 줄 수 있고, 작성자도 리뷰어의 변경 의도를 제대로 이해 할 수 있기 때문이다.  
작성자와 리뷰어가 나란히 앉아서 코드를 훑어가며 리팩터링을 진행하면 자연스럽게 페어 프로그래밍이 되어 효과적이다.

## 2.4 - Problems with Refactoring

### 새 기능 개발 속도 저하
> 리팩터링의 궁극적인 목적은 개발 속도를 높여서, 더 적은 노력으로 더 많은 가치를 창출 하는 것이다.

리팩터링의 본질은 코드 베이스를 예쁘게 꾸미는것이 아니라 오로지 경제적인 이유로 하는것이다.  
리팩터링은 개발 기간을 단축 하고자 하는것으로, 기능 추가 시간을 줄이고 버그 수정 시간을 줄여준다.
