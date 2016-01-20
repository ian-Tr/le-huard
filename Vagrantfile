# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "le-huard.dev"
  config.vm.network :private_network, ip: "192.168.56.103"
  config.vm.synced_folder "./", "/var/www/le-huard.dev", id: "web-root",
      owner: "vagrant",
      group: "www-data",
      mount_options: ["dmode=775,fmode=664"]

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Define a Vagrant Push strategy for pushing to Atlas. Other push strategies
  # such as FTP and Heroku are also available. See the documentation at
  # https://docs.vagrantup.com/v2/push/atlas.html for more information.
  # config.push.define "atlas" do |push|
  #   push.app = "YOUR_ATLAS_USERNAME/YOUR_APPLICATION_NAME"
  # end

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.

config.vm.provision "shell", inline: <<-SHELL

sudo apt-get update
sudo add-apt-repository ppa:ondrej/php5 -y
sudo apt-get update
sudo apt-get install nginx -y
sudo apt-get install debconf-utils -y
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password admin'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password admin'
sudo apt-get -y install mysql-server
sudo mysql_install_db


# automate mysql_secure_installation
sudo apt-get install expect -y
SECURE_MYSQL=$(expect -c "
set timeout 10
spawn mysql_secure_installation
expect \"Enter current password for root (enter for none):\"
send \"admin\r\"
expect \"Change the root password?\"
send \"n\r\"
expect \"Remove anonymous users?\"
send \"y\r\"
expect \"Disallow root login remotely?\"
send \"y\r\"
expect \"Remove test database and access to it?\"
send \"y\r\"
expect \"Reload privilege tables now?\"
send \"y\r\"
expect eof
")
echo "$SECURE_MYSQL"
sudo apt-get purge -y expect

sudo apt-get install -y php5-fpm php5-mysql
sudo sed -ie "s/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/" /etc/php5/fpm/php.ini
sudo service php5-fpm restart

# nginx server configuration automation
sudo bash -c "> /etc/nginx/sites-available/default"
server='
server {
listen 80 default_server;
listen [::]:80 default_server ipv6only=on;
root /var/www/le-huard.dev;
index index.php /src/server/index.php;
server_name le-huard.dev;
location / {
try_files $uri $uri/ /src/server/index.php;
}
location ~ \.php$ {
try_files $uri =404;
fastcgi_split_path_info ^(.+\.php)(/.+)$;
fastcgi_pass unix:/var/run/php5-fpm.sock;
fastcgi_index index.php;
fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
include fastcgi_params;
}
}
'
sudo echo "$server" | sudo tee /etc/nginx/sites-available/default
sudo service nginx restart

# phpmyadmin automated install
sudo echo "phpmyadmin phpmyadmin/reconfigure-webserver multiselect none" | sudo debconf-set-selections
sudo echo "phpmyadmin phpmyadmin/dbconfig-install boolean true" | sudo debconf-set-selections
sudo echo "phpmyadmin phpmyadmin/mysql/admin-user string root" | sudo debconf-set-selections
sudo echo "phpmyadmin phpmyadmin/mysql/admin-pass password admin" | sudo debconf-set-selections
sudo echo "phpmyadmin phpmyadmin/mysql/app-pass password admin" |sudo debconf-set-selections
sudo echo "phpmyadmin phpmyadmin/app-password-confirm password admin" | sudo debconf-set-selections
sudo apt-get -y install phpmyadmin
sudo ln -s /usr/share/phpmyadmin/ /var/www/le-huard.dev

SHELL

end
