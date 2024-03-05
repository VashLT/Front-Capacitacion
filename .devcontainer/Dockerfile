#Uso una imagen de ubuntu para acceder a ciertas características.
FROM ubuntu:18.04

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
# Instalo curl junto con otras librerías para poder usar nvm.
RUN apt-get update --fix-missing
RUN apt-get install -y curl
RUN apt-get install -y wget
RUN apt-get install -y build-essential libssl-dev

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 14.17.5

# Instalo nvm, luego node y npm.
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

#Mantengo node en las variables de entorno para poder usar el comando node.
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Chrome dependences
RUN apt-get install -y libgbm1 libxss1 libindicator7 fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libgtk-3-0 libnspr4 libnss3 libx11-xcb1 libxtst6 lsb-release xdg-utils

# Chrome repository
RUN cd /tmp/
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i ./google-chrome*.deb
RUN rm ./google-chrome*.deb
RUN apt-get install -f
#Instalo angular, yarn y git
RUN npm install -g @angular/cli
RUN npm install -g yarn
RUN apt-get install git -y