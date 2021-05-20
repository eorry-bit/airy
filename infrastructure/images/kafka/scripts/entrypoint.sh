#!/bin/bash
set -e

if [[ "$1" == kafka-server-start.sh && "$2" == /etc/kafka/server.properties ]];then
	/root/configure-kafka.sh
elif
	[[ "$1" == zookeeper-server-start.sh && "$2" == /etc/kafka/zookeeper.properties ]];then
	/root/configure-zookeeper.sh
elif
	[[ "$1" == connect-distributed.sh && "$2" == /etc/kafka/kafka-connect.properties ]];then
	/root/configure-kafka-connect.sh
else
	echo "Unsupported arguments to docker entrypoint"
	exit 1
fi

sleep 5000