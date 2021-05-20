#!/bin/bash
set -eo pipefail

CONFIG=/etc/kafka/kafka-connect.properties

echo "bootstrap.servers=${CONNECT_BOOTSTRAP_SERVERS}" >> $CONFIG
echo "group.id=${CONNECT_GROUP_ID}" >> $CONFIG

echo "Printing out the broker configuration"
cat $CONFIG
