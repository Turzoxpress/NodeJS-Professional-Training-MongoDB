# Installing necessary softwares

![NodeJS](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/2560px-Node.js_logo_2015.svg.png)

### Install NodeJS 16 on Ubuntu 20.04

[Link](https://www.stewright.me/2022/01/tutorial-install-nodejs-16-on-ubuntu-20-04/)

```
# We will install node 16
curl -s https://deb.nodesource.com/setup_16.x | sudo bash

sudo apt install nodejs -y

#Check node version
node --version

#Check npm version
npm --version
```

![MongoDB](https://www.ictdemy.com/images/5728/mdb.png)

### Install MongoDB Community Edition on Ubuntu 20

[Link](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)

```
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -

sudo apt-get install gnupg

echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

sudo apt-get update

sudo apt-get install -y mongodb-org

sudo service mongod restart
#or
sudo systemctl start mongod
```

![Postman](https://mms.businesswire.com/media/20200203005177/en/761650/22/postman-logo-vert-2018.jpg)

### Install Postman on Ubuntu 20.04

[Link](https://linuxize.com/post/how-to-install-postman-on-ubuntu-20-04/)

```
sudo snap install postman
```

![Robo 3T](https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_f49ab27210b28cdaf3e3bd3f7d2d629f/robo3t.png)

### Install robo3t-snap on Ubuntu

[Link](https://snapcraft.io/install/robo3t-snap/ubuntu)

```
sudo apt update

sudo apt install snapd

sudo snap install robo3t-snap
```

![Visual Studio Code](https://yt3.ggpht.com/_q52i8bUAEvcb7JR4e-eNTv23y2A_wg5sCz0NC0GrGtcw1CRMWJSOPVHUDh_bngD0q4gMvVeoA=s900-c-k-c0x00ffffff-no-rj)

### How to Install Visual Studio Code on Ubuntu 20

[Link](https://linuxize.com/post/how-to-install-visual-studio-code-on-ubuntu-20-04/)

```
sudo snap install --classic code
```
