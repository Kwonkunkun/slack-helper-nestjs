# slack-helper-nestjs

<img width="832" alt="스크린샷 2023-01-11 오후 7 50 11" src="https://user-images.githubusercontent.com/59603575/211790183-7198b708-7d97-487f-a469-6a4e286b87e7.png">


## Feature

- google drive search 기능
- 정한 file naming rule 에 맞는지 검사 기능 등

<img width="836" alt="스크린샷 2023-01-11 오후 8 05 46" src="https://user-images.githubusercontent.com/59603575/211790815-ee9f678a-6522-4fe0-8758-7eee3bd67f58.png">

<img width="701" alt="image" src="https://user-images.githubusercontent.com/59603575/211790240-daad3e54-5d25-49b3-b85a-5ab4c6db2af9.png">

## Running the app

#### .env.* 추가
- SLACK_TOKEN: slack bot token
- GOOGLE_APPLICATION_CREDENTIALS: [이 링크](https://www.npmjs.com/package/googleapis)의 Using the GOOGLE_APPLICATION_CREDENTIALS 참고

```bash
npm install
npm run start[:mode] #세팅에 따라 dev, prod
```