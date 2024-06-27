
export default class RegistroUsuarioPageRules 
{

    static nomeRules = [
        value => {
          if (value) return true

          return 'Nome é obrigatório'
        },
        value => {
          if (value?.length <= 50) return true

          return 'Nome deve conter no máximo 40 caracteres'
        },
    ];

    static tipoUsuarioRules = [
        value => {
          if (value) return true
          return 'Perfil de usuário é obrigatório '
        },
    ];
    
    static docRegistroRules = [
        value => {
          if (value) return true
          return 'CRM/CRP é obrigatório'
        },
    ];

    static senhaRules = [
        value => {
        if (value) return true
            return 'Senha é obrigatório.'
        }, 
    ];
    
    static emailRules = [
        value => {
        if (value) return true

        return 'E-mail é obrigatório.'
        },
        value => {
        if (/.+@.+\..+/.test(value)) return true

        return 'E-mail inválido.'
        },
    ]
  
    // More validation rules...
  }