<template>
    <div>
      <div> 
        KKKK SADSADS
        <v-text-field
            v-model="password" 
            :state="this.passwordState"
            :append-inner-icon="isPasswdVisible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="isPasswdVisible ? 'text' : 'password'"
            density="compact"
            placeholder="SENHA sua senha"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
            @input="checkPassword"
        ></v-text-field>


        <div class="requirements" v-if="password">
          <ul>
            <li :style="{ color: lengthColor }">Ao menos 6 caracteres.</li>
            <li :style="{ color: numberColor }">Ao menos 1 número.</li>
            <li :style="{ color: uppercaseColor }">Ao menos 1 letra maiúscula.</li>
            <li :style="{ color: specialCharColor }">Ao menos 1 caractere especial.</li>
          </ul>
        </div>
      </div>
      <div class="progress mt-2">
        <div class="progress-bar" role="progressbar" :style="{ width: passwordStrength + '%' }" :class="progressClass">{{ passwordStrengthText }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MyPasswordValidator',
    data() {
      return {
        password: '',
        passwordState: false,
        lengthColor: 'red',
        numberColor: 'red',
        uppercaseColor: 'red',
        specialCharColor: 'red'
      };
    },
    props:                     {
        isPasswdVisible: {
          required: true, 
        },
    },
    computed: {
       
      passwordStrength() {
        if (this.password.length === 0) return 0;
        const length = this.password.length >= 6 ? 25 : 0;
        const number = /\d/.test(this.password) ? 25 : 0;
        const uppercase = /[A-Z]/.test(this.password) ? 25 : 0;
        const specialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(this.password) ? 25 : 0;
        return length + number + uppercase + specialChar;
      },
      passwordStrengthText() {
        if (this.passwordStrength < 35) return 'Muito fraca';
        if (this.passwordStrength < 50) return 'Fraca';
        if (this.passwordStrength < 75) return 'Forte';
        return 'Muito Forte';
      },
      progressClass() {
        if (this.passwordStrength < 35) return 'bg-danger';
        if (this.passwordStrength < 50) return 'bg-warning';
        if (this.passwordStrength < 75) return 'bg-info';
        return 'bg-success';
      }
    },
    methods: {
      checkPassword() {
        this.lengthColor = this.password.length >= 6 ? 'green' : 'red';
        this.numberColor = /\d/.test(this.password) ? 'green' : 'red';
        this.uppercaseColor = /[A-Z]/.test(this.password) ? 'green' : 'red';
        this.specialCharColor = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(this.password) ? 'green' : 'red';
  
        this.passwordState = ( this.passwordStrength > 50 ) ? true : false;
  
        var passwdObj = {
            isSenhaValida: (this.passwordStrength > 50) ? true : false,
            senha: this.password
        }
        //alert( "Dntro CMP >>" + JSON.stringify(  passwdObj ) );
        this.$emit('updatePasswd', passwdObj ); // Emitting the password value to the parent
      }
    }
  };
  </script>
  
  <style>
  .requirements {
    margin-top: 5px;
    background-color:  rgb(218, 223, 221)}
  
  .requirements ul {
    list-style: none;
    padding: 0;
    font-size: 12px;
  }
  
  .progress {
    height: 20px;
  }
  
  .progress-bar {
    color: white;
    font-weight: bold;
  }
  </style>
  