// .......................................................................................origenes de los J'son
// const urls = ['https://github.com/Laboratoria/scl-2018-05-bc-core-pm-datadashboard/blob/master/data/cohorts/lim-2018-03-pre-core-pw/users.json',
//   'https://github.com/Laboratoria/scl-2018-05-bc-core-pm-datadashboard/blob/master/data/cohorts/lim-2018-03-pre-core-pw/progress.json',
//   'https://github.com/Laboratoria/scl-2018-05-bc-core-pm-datadashboard/blob/master/data/cohorts.json']

// const urls = ['../data/cohorts/lim-2018-03-pre-core-pw/users.json',
//   '../data/cohorts/lim-2018-03-pre-core-pw/progress.json',
//   '../data/cohorts.json']

  const urls = ['http://127.0.0.1:8887/data/cohorts/lim-2018-03-pre-core-pw/users.json',
  'http://127.0.0.1:8887/data/cohorts/lim-2018-03-pre-core-pw/progress.json',
  'http://127.0.0.1:8887/data/cohorts.json']

let courses
let datos
let contado
let idSinDatos = []
let arrayTotalUsers
let users
// ....................................................................................Consumiendo data(promesas)
Promise.all(urls.map(url =>
  fetch(url)
    .then(resp => resp.json())))
  .then(data => {
    const users1 = data[0]
    const progress = data[1]
    const courses = data[2]
    // courses = Object.keys(cohort[31].coursesIndex)
    // datos = courses[0]

    window.computeUsersStats(users1, progress, courses)
  })
  .catch(e => console.log(e))

// ...................................................................Fx's Requerida Modelo de Vista Controlador(MVC)
window.computeUsersStats = (users1, progress, courses) => {
  // ................................................................filtrado
  contador = 0
  idSinDatos = []
  arrayTotalUsers = users1.map(user => {
    // ............................................................filtrado de alumnas sin datos
    if ((progress[user.id].intro === undefined)) {
      contador++
      idSinDatos.push(contador, user.id)
      return (false)
    } else {
      // ..................................................................fin filtro
      user.stats = {
        percent: percentCUS(progress[user.id]),
        exercises: {
          total: 2,
          completed: exCompletedCUS(progress[user.id]),
          percent: Math.round(exCompletedCUS(progress[user.id]) * 100 / 3)
        },
        reads: {
          total: 11,
          completed: reCompletedCUS(progress[user.id]),
          percent: Math.round(reCompletedCUS(progress[user.id]) * 100 / 11)
        },
        quizzes: {
          total: 3,
          completed: quizCompletedCUS(progress[user.id]),
          percent: Math.round(quizCompletedCUS(progress[user.id]) * 100 / 3),
          scoreSum: parseInt(sumScoresCUS(progress[user.id])),
          scoreAvg: promedioPuntajeQuizzes(progress[user.id])
          
        }
      }

      return user
    }
  })
  // ...................................................................................Eliminando usuarias sin data
  users = arrayTotalUsers.filter(Boolean)
  console.log(`Arreglo de usuarias filtradas con propiedad.stats agregada`)

 //....................................Creando lista de cohorts disponibles y seleccion de cohort donde esta la info 
 let cohortsNombres1 = '';
    cohortsNombres1 += `<select id='selectCohorts1'><option> Selecciona Cohorts </option>`
    courses.forEach(course => {
    cohortsNombres1 += `<option >${course.id}</option>            `
    })
    cohortsNombres1 += `</select>`
  listaUsuarias.innerHTML = cohortsNombres1;
 // ...................................................................leyendo el valor de la  seleccion del cohorts
  let seleccionCohort1 = document.getElementById('selectCohorts1')
  seleccionCohort1.addEventListener('change', () => {
  console.log(seleccionCohort1.value)
   // ............................................................. Para seleccionar la opcion que contiene alumnas
   if (seleccionCohort1.value === 'lim-2018-03-pre-core-pw') {
 
//............................................................................Crear Listado Scroll
    let usuariasListado = ''
        usuariasListado += `<select id='selectAlumnas1'><option disabled selected >Listado de Alumnas</option>`
        users.forEach(user => {
        usuariasListado += `<option value='${user.id}${user.stats.exercises.percent}'>${user.name}</option>`
        })
        usuariasListado += `</select>`   
        listaUsuarias.innerHTML = usuariasListado

    let select = document.getElementById('selectAlumnas1');
    select.addEventListener('change',
    function(){
    var selectedOption = select.options[select.selectedIndex];
    console.log(selectedOption.value);
    });

} else if (seleccionCohort1.value !== 'lim-2018-03-pre-core-pw') {
// ..........................................hacer un div none,block para mostrar esto,NO-OLVIDAR
console.log('Lo sentimos no se encuentran datos disponibles.')
}
})              
  // ...........................................................fx's que toman argumentos de aca

  promedioGeneral(users)
  excercisesProm(users)
  readsProm(users)
  quizzProm(users)
  quizzScoresProm(users)
  window.sortUsers(users)
  window.filterUsers(users)
  generarTablaUsuarios(users)
  
  return (users)
}

window.sortUsers = (users, orderBy='Nombre', orderDirection='asc') => {
  let arrayordenado = users;
//.............................................................................sort:Nombre
  if (orderBy === 'Nombre') {
    if (orderDirection === 'asc') {
      arrayordenado= users.sort(function(a, b){
        let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
        if (nameA < nameB) 
        return -1;
        if (nameA > nameB)
          return 1;
          return 0; 
      });
    }
    if (orderDirection === 'desc') {
      arrayordenado= users.sort(function(a, b){
        let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
        if (nameA > nameB) 
        return -1;
        if (nameA < nameB)
         return 1;
        return 0; 
      });
    }
  }
//..................................................................sort:Completitud Total  

  if (orderBy === 'Completitud Total') {
    if (orderDirection === 'asc') {
      arrayordenado = users.sort(function(a, b){
        let number1=a.stats.percent, number2=b.stats.percent;
        if (number1 > number2) 
        return -1;
        if (number1 < number2)
         return 1;
        return 0; 
      });
    }
    if (orderDirection === 'desc') {
      arrayordenado=users.sort(function(a, b){
        let number1=a.stats.percent, number2=b.stats.percent;
        if (number1 < number2) 
        return -1;
        if (number1 > number2)
         return 1;
        return 0; 
      });
    }
  }
//..................................................................sort:Ejercicios Completados
  if (orderBy === 'Ejercicios Completados') {
    if (orderDirection === 'asc') {
      arrayordenado= users.sort(function(a, b){
        let number1=a.stats.exercises.percent, number2=b.stats.exercises.percent;
        if (number1 > number2) 
        return -1;
        if (number1 < number2)
         return 1;
        return 0; 
      });
    }  
    if (orderDirection === 'desc') {
      arrayordenado= users.sort(function(a, b){
        let number1=a.stats.exercises.percent, number2=b.stats.exercises.percent;
        if (number1 < number2) 
        return -1;
        if (number1 > number2)
         return 1;
        return 0; 
      });
     
    }
  }
//..................................................................sort:Lecturas Completadas  

  if (orderBy === 'Lecturas Completadas') {
    if (orderDirection === 'asc') {
      arrayordenado= users.sort(function(a, b){
        let number1=a.stats.reads.percent, number2=b.stats.reads.percent;
        if (number1 > number2) 
        return -1;
        if (number1 < number2)
         return 1;
        return 0; 
      });
      
    }
    if (orderDirection === 'desc') {
      arrayordenado= users.sort(function(a, b){
        let number1=a.stats.reads.percent, number2=b.stats.reads.percent;
        if (number1 < number2) 
        return -1;
        if (number1 > number2)
         return 1;
        return 0; 
      });
    }
  }
//..................................................................sort: Quizzes Completadas  

  if (orderBy === 'Quizzes Completados') {
    if (orderDirection === 'asc') {
      arrayordenado= users.sort(function(a, b){
        let number1=a.stats.quizzes.percent, number2=b.stats.quizzes.percent;
        if (number1 > number2) 
        return -1;
        if (number1 < number2)
         return 1;
        return 0; 
      });
    }
    if (orderDirection === 'desc') {
      arrayordenado= users.sort(function(a, b){
        let number1=a.stats.quizzes.percent, number2=b.stats.quizzes.percent;
        if (number1 < number2) 
        return -1;
        if (number1 > number2)
         return 1;
        return 0; 
      });
    }
  }
//..................................................................sort:  puntaje promedio  de Quizzes Completadas    

  if (orderBy === 'Quizzes Score') {
    if (orderDirection === 'asc') {
      arrayordenado= users.sort(function(a, b){
        let number1=a.stats.quizzes.scoreAvg  , number2=b.stats.quizzes.scoreAvg;
        if (number1 > number2) 
        return -1;
        if (number1 < number2)
         return 1;
        return 0; 
      });
    }
    if (orderDirection === 'descs') {
      arrayordenado= users.sort(function(a, b){
        let number1=a.stats.quizzes.scoreAvg  , number2=b.stats.quizzes.scoreAvg;
        if (number1 > number2) 
        return -1;
        if (number1 < number2)
         return 1;
        return 0; 
      }); 
    }
  }
  console.log(`Array que puede ser ordenado de manera asc o desc por las propiedades de:
  Nombre,
  Completitud Total,
  Ejercicios Completados,
  Lecturas Completadas,
  Quizzes Completados,
  Quizzes Score`)
  console.log (arrayordenado)
  return arrayordenado;
};

window.filterUsers = (users, search ='am') => {
  let nameFilter = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));
 console.log('filtro para buscar por nombre (case insensitive)')
  console.log(nameFilter)
  return nameFilter
};

window.processCohortData = (options) => {

}









