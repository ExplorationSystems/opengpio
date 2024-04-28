# Clean directory
echo "Start to build libgpiod"
echo "Cleaning directory"
rm -rf libgpiod

# Clone libgpiod on branch 2.1.x
echo "Clone libgpiod repository at v2.1.x"
git clone -b v2.1.x git@github.com:brgl/libgpiod.git
cd libgpiod

# Build and install libgpiod
echo "Build and install libgpiod"
./autogen.sh --enable-bindings-cxx
make
make install