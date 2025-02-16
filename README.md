## APP 설명
회사나 학교, 동아리 등에서 사용할 수 있는 캘린더 서비스를 구상하였습니다.

## 소스 빌드 및 실행 방법
git clone
```
git clone https://github.com/lionbak/clush-front.git
```
package.json 수정 (필요시)
```
"proxy": "http://localhost:8093" //백엔드의 포트번호
```
npm install
```
npm install
```
실행
```
npm start
```
http://localhost:3000 에서 실행

## 주력으로 사용한 컴포넌트
- fullcalendar: 캘린더 UI를 효율적으로 관리하기 위해 사용하였습니다. 이벤트 등록, 수정, 삭제 기능을 손쉽게 구현하기 위해 사용하였습니다.
- axios : 백엔드 API와 http 비동기 통신을 위해 사용하였습니다.
- date-fns : TimeZone(시간대)에 대한 포맷을 변경하기 위하여 사용하였습니다.
- jsqr : import하여 QR코드를 스캔하기 위해 사용하였습니다.
