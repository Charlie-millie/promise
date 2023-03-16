# Charlie Promise
- promise polyfill

## Promise 구현 정의
- Promise는 pending(대기), fulfilled(처리), rejected(거부) 3개의 상태를 가짐
- Promise가 처리/거부 될때 then 메서드에 의해서 큐에 추가된 처리기(callBack)들이 호출됨
- then, catch 메서드의 반환값은 새로운 프로미스이므로 체이닝 가능

## Promise 처리 순서
    [pending] -> [fulfill] -> [actions] -> [pending]

              -> [reject] -> [error] ->

## promise 구현 규약 (참고용)
- https://promisesaplus.com/

## Reference
- https://github.com/stefanpenner/es6-promise/blob/master/lib/es6-promise/promise.js
- https://github.com/taylorhakes/promise-polyfill/blob/master/src/index.js
- https://unpkg.com/browse/es6-promise-polyfill@1.2.0/promise.js
- https://medium.com/swlh/implement-a-simple-promise-in-javascript-20c9705f197a

## 개발 모드 실행
터미널에서 `npm run dev` 입력
- http://localhost:8080 으로 접속

## 빌드 실행
터미널에서 `npm run build` 입력
- /public/build/ 폴더에 번들링 파일 생성

