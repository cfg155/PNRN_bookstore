apt update && apt install -y
apt-get install -y

# Install Postgres
apt install postgresql -y

# append config to postgres file
echo "host  all     all     0.0.0.0/0   trust" >> /etc/postgresql/12/main/pg_hba.conf
echo "listen_addresses = '*'" >> /etc/postgresql/12/main/postgresql.conf

systemctl restart postgresql