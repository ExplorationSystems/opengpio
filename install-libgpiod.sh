# Clean directory
echo "Cleaning directory"
rm -rf libgpiod-2.1
# rm -rf libgpiod

# Ensure build dependancies
echo "Ensure build dependancies"
sudo apt install tar gzip build-essential autoconf curl

# Fetch libgpiod on branch 2.1.x
echo "Fetching libgpiod v2.1"
# git clone -b v2.1.x git@github.com:brgl/libgpiod.git
# cd libgpiod
curl -o libgpiod-2.1.tar.gz 'https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/snapshot/libgpiod-2.1.tar.gz'
tar xf libgpiod-2.1.tar.gz
cd libgpiod-2.1

# Build and install libgpiod
echo "Build and install libgpiod"
./autogen.sh --enable-bindings-cxx
make
make install