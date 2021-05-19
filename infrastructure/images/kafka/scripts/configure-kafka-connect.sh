#!/bin/bash
set -eo pipefail

CONFIG=/etc/kafka/kafka-connect.properties

echo "bootstrap.servers=kafka-headless:9092" >> $CONFIG


echo "Printing out the broker configuration"
cat $CONFIG
