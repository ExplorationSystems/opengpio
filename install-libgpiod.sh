# Clean directory
echo "Cleaning directory"
rm -rf libgpiod-2.1

# Ensure build dependancies
echo "Ensure build dependancies"
sudo apt install tar gzip build-essential autoconf curl autoconf-archive autoupdate

# Fetch libgpiod on branch 2.1.x
echo "Fetching libgpiod v2.1"
curl -o libgpiod-2.1.tar.gz 'https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/snapshot/libgpiod-2.1.tar.gz'
tar xf libgpiod-2.1.tar.gz
cd libgpiod-2.1

# Build and install libgpiod
echo "Build and install libgpiod"
./autogen.sh --enable-bindings-cxx
make
make install