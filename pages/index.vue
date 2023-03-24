<!--
  ### nama file di pages akan otomatis menjadi route url
-->

<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <v-card class="my-5">
        <v-row>
          <v-col cols="12" class="logo py-16 d-flex justify-center">
            <ImipLogo />
          </v-col>
          <v-col class="pl-16" cols="12" sm="7" md="7">
            <v-card-title class="text-h3 cl-green">
              <strong>TENTANG IMIP</strong>
            </v-card-title>
            <v-card-text class="text-lg">
              <p>
                PT Indonesia Morowali Industrial Park (IMIP) mengelola kawasan
                industri berbasis nikel yang terintegrasi dengan produk utama
                berupa nikel, stainless steel dan carbon steel. Industri
                pendukungnya terentang dari coal power plant, pabrik mangan,
                silikon, chrome, kapur, kokas, dan lainnya, hingga pelabuhan dan
                bandara.
              </p>
              <p>
                Kawasan Industri IMIP, merupakan kerjasama antara BintangDelapan
                Group dari Indonesia dengan Tsingshan Steel Group dari negara
                Tiongkok.
              </p>
              <p>
                <strong> Sekilas Tsingshan Group </strong>
                <br />
                Sebelum membangun industri berbasis nikel di Morowali, Tsingshan
                Group memiliki 3 unit produksi nikel pig iron (npi) dengan
                kapasitas 2 juta ton dan 3,4 juta ton Stainless Steel. Tsingshan
                Group merupakan perusahaan terbesar di dunia di bidang
                pengolahan Nikel dan sudah menguasai teknologi pengolahan yang
                lengkap dengan teknologi maju dan modern.
              </p>
            </v-card-text>
            <v-row class="px-4">
              <v-col cols="4">
                <v-card>
                  <router-link to="user" tag="div" class="my-card" style="background-image: url('growth.png');background-size: 37%;background-position: center 20px;">
                    <div class="text-center">
                      <p class="my-card-title mb-4 white--text">Welcome</p>
                      <p class="white--text">Menampilkan deteail tentang aplikasi</p>
                    </div>
                  </router-link>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card>
                  <router-link to="user" tag="div" class="my-card" style="background-image: url('team.png');background-size: 47%; background-position: top;">
                    <div class="text-center">
                      <p class="my-card-title mb-4 white--text">DataTable</p>
                      <p class="white--text">Menampilkan daftar pegawai dengan DataTable</p>
                    </div>
                  </router-link>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card>
                  <router-link to="user" tag="div" class="my-card" style="background-image: url('schedule.png');background-size: 45%; background-position: center 20px;">
                    <div class="text-center">
                      <p class="my-card-title mb-4 white--text">Handsontable</p>
                      <p class="white--text">Menampilkan daftar pegawai dengan Handsontable</p>
                    </div>
                  </router-link>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="5" md="5" class="pr-16 mb-10">
            <img src="page-banner-11.jpg" width="100%" alt="" />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  // auth: 'guest',
  auth: false,
}
</script>

<style>
/* body {
    font-size: 14px !important;
    font-family: 'Poppins', sans-serif;
} */
p {
  font-size: 16px;
  color: rgb(73, 73, 73);
  transition: 0.5s;
}
@media (max-width: 1500px) {
  /* p {
    font-size: 12px;
  } */
}
@media (max-width: 1650px) {
  /* p {
    font-size: 14px;
  } */
}
</style>
