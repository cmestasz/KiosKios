# KiosKios
## Proyecto final de Programación Web 2
**NO SE PUEDE EJECUTAR ESTE PROYECTO EN WINDOWS**

### Instalación
1. Python
    1. Requerimientos

```bash
pip install -r requirements.txt
```

**Si es posible instalar los siguientes en version dev con el administrador de paquetes se puede saltar este paso**

2. Librerías geográficas (Linux)
- Instalar GEOS

```bash
wget https://download.osgeo.org/geos/geos-3.9.5.tar.bz2
tar xjf geos-3.9.5.tar.bz2

cd geos-3.9.5
mkdir build
cd build

cmake -DCMAKE_BUILD_TYPE=Release ..
cmake --build .
sudo cmake --build . --target install
```

- Instalar PROJ
    - Instalar libsqlite3-dev (apt), sqlite-devel (dnf)
    - Instalar libtiff-dev (apt), libtiff-devel (dnf)
    - Instalar libcurl-dev (apt), libcurl-devel (dnf)

```bash
wget https://download.osgeo.org/proj/proj-9.4.1.tar.gz
wget https://download.osgeo.org/proj/proj-data-1.9.tar.gz

tar xzf proj-9.4.1.tar.gz
cd proj-9.4.1/data
tar xzf ../../proj-data-1.9.tar.gz
cd ../..

cd proj-9.4.1
mkdir build
cd build

cmake ..
cmake --build .
sudo cmake --build . --target install
```

- Instalar GDAL

```bash
wget https://download.osgeo.org/gdal/3.7.0/gdal-3.7.0.tar.gz
tar xzf gdal-3.7.0.tar.gz

cd gdal-3.7.0
mkdir build
cd build

cmake ..
cmake --build .
sudo cmake --build . --target install
```

- Instalar SpatiaLite
    - Instalar libfreexl-dev (apt), freexl-devel (dnf)
    - Instalar libminizip-dev (apt), minizip-devel (dnf)
```bash
wget https://www.gaia-gis.it/gaia-sins/libspatialite-sources/libspatialite-5.1.0.tar.gz
tar xzf libspatialite-5.1.0.tar.gz

cd libspatialite-5.1.0

./configure --disable-geos3100 --disable-rttopo --disable-gcp
make -j8
sudo make install
```

