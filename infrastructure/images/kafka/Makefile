build:
	docker build -t airy-kafka .

release: build
	docker tag airy-kafka ghcr.io/airyhq/infrastructure/kafka:develop
	docker push ghcr.io/airyhq/infrastructure/kafka:develop
