# 프론트엔드 애플리케이션을 빌드해서 Nginx로 서빙하기
FROM node:alpine as builder

# 컨테이너 내부에서 작업할 디렉토리를 /app으로 명시
# 이후에 들어오는 명령어는 전부 /app 디렉토리 기준으로 실행
WORKDIR /app

# 로컬의 package.json을 복사해서 컨테이너 내부의 디렉터리에 복사
# ./는 현재 디렉토리로 workdir에서 설정한 /app이 됨.
COPY ./package.json ./

# 위에서 복사한 package.json 기준으로 컨테이너 내에 의존성 설치
RUN npm install

# 프로젝트 전체를 컨테이너 /app로 복사
COPY . .

# 리액트 앱을 빌드. 결과물은 /app/build 디렉토리에 저장됨.
RUN npm run build


# 위에서 만든 빌드 결과물을 서빙할 경량 nginx 이미지 생성
FROM nginx
EXPOSE 3000

# 도커 컨텍스트의 기준은 모두 상대 경로여야 함.
# ./nginx/default.conf: <context>/nginx/default.conf로, docker-compose에서 정의한 context확인하기
# /etc/nginx/conf.d/default.conf: 컨테이너 내부의 절대 경로
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# --from=builder: 앞에서 선언한 첫번째 스테이지 이름. (as builder)
# builder라는 이름의 스테이지에서 /app/build 경로에 있는 결과물(정적파일)을 /usr/..에 복사 
COPY --from=builder /app/build /usr/share/nginx/html

