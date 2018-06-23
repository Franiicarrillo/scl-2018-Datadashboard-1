// .......................................................................................origenes de los J'son
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

// ...................................................................Fx Requerida Modelo de Vista Controlador(MVC)
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
  console.log(users)







  
 //....................................Creando lista de cohorts disponibles y seleccion de cohort donde esta la info 
 let cohortsNombres1 = '';
 cohortsNombres1 += `<select id='selectCohorts1'><option> Selecciona Cohorts </option>`
 courses.forEach(course => {
   cohortsNombres1 += `<option >${course.id}</option> 
             `
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
      usuariasListado += `<select id='selectAlumnas1'onchange=${mostrarData()}><option >Listado de Alumnas</option>`
    users.forEach(user => {
      usuariasListado += `<option value=${promedioGeneral(progress[user.id])}>${user.name}</option>`
    })
     usuariasListado += `</select>`
     `<input type='text' id='datos' />`
     
  listaUsuarias.innerHTML = usuariasListado

  function mostrarData() {
    var userSeleccionada = document.getElementById('selectAlumnas1');
    var optionSelected = userSeleccionada.options[userSeleccionada.selectedIndex].value;
    document.getElementById('datos').value = optionSelected;
}
 

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
  
  return (users)
}

// ........................................................fx's para componer  fx principales ;cus=CompuUsersStats
function percentCUS (progress) {
  let porcentajeTotal = progress.intro.percent
  return porcentajeTotal
}

function exCompletedCUS (progress) {
  const rutacus = progress.intro.units['02-variables-and-data-types']
  let ejerCUS01 = rutacus.parts['06-exercises'].completed
  let ejerCUS02 = rutacus.parts['06-exercises'].completed
  let sumExercisesCUS = (ejerCUS01 + ejerCUS02)
  return sumExercisesCUS
}

function reCompletedCUS (progress) {
  const ruta1cus = progress.intro.units['01-introduction']
  let readcus10 = ruta1cus.parts['00-welcome-and-orientation'].completed
  let readcus11 = ruta1cus.parts['01-growth-mindset'].completed
  let readcus12 = ruta1cus.parts['02-why-learn-to-code'].completed
  let readcus13 = ruta1cus.parts['03-your-first-website'].completed

  const ruta2cus = progress.intro.units['02-variables-and-data-types']
  let readcus20 = ruta2cus.parts['00-values-data-types-and-operators'].completed
  let readcus21 = ruta2cus.parts['01-variables'].completed
  let readcus22 = ruta2cus.parts['02-self-learning-MDN'].completed
  let readcus23 = ruta2cus.parts['03-comments'].completed

  const ruta3cus = progress.intro.units['03-ux-design']
  let readcus30 = ruta3cus.parts['00-development-team'].completed
  let readcus31 = ruta3cus.parts['01-ux-design'].completed
  let readcus32 = ruta3cus.parts['02-ux-design-vs-ui-design'].completed

  let subTotalcus = (readcus10 + readcus11 + readcus12 + readcus13 + readcus20 +
    readcus21 + readcus22 + readcus23 + readcus30 + readcus31 + readcus32)
  return subTotalcus
}

let quizz1cus=0;
let quizz2cus=0;
let quizz3cus=0;
function quizCompletedCUS (progress) {
  quizz1cus = progress.intro.units['01-introduction'].parts['04-quiz'].completed
  quizz2cus = progress.intro.units['02-variables-and-data-types'].parts['05-quiz'].completed
  quizz3cus = progress.intro.units['03-ux-design'].parts['03-quiz'].completed
  let quizSubTotalcus = (quizz1cus + quizz2cus + quizz3cus)
  return quizSubTotalcus
}

function sumScoresCUS (progress) {
  let score1cus=0;
  let score2cus=0;
  let score3cus=0; 
  if (quizz1cus === 1) {
    score1cus = progress.intro.units['01-introduction'].parts['04-quiz'].score
  } else {
    score1cus === 0
  };
  if (quizz2cus ===1) {
    score2cus = progress.intro.units['02-variables-and-data-types'].parts['05-quiz'].score
  } else {
    score2cus === 0
  };
  if (quizz3cus === 1) {
    score3cus = progress.intro.units['03-ux-design'].parts['03-quiz'].score
  } else {
    score3cus === 0
  };
  let sumPuntajescus = (score1cus + score2cus + score3cus)
  return sumPuntajescus
}

function promedioPuntajeQuizzes(progress) {
  if(quizCompletedCUS(progress)!==0){
    return Math.round(sumScoresCUS(progress) / quizCompletedCUS(progress))
  }else{return 0};
}

//                                       **** PARA ESTADISTICAS DEL CURSO****
// ..................................................promedio % de completitud de todo "intro" .
function promedioGeneral (users) {
  let notas = 0
  for (i = 0; i < users.length; i++) {
    notas += users[i].stats.percent
  }
  let promedio = parseInt(notas / users.length)

  console.log(`Promedio completitud del curso :${promedio} %`)
}
// ...................................................promedio("promedio1") del curso de ejercicicios realizados

function excercisesProm (users) {
  let notas1 = 0
  // console.log(users[4].stats.exercises.percent)
  for (i = 0; i < users.length; i++) {
    notas1 += users[i].stats.exercises.percent
  }
  let promedio1 = parseInt(notas1 / users.length)
  console.log(`Promedio completitud ejercicios del curso:${promedio1}%`)
}
// ...................................................promedio("promedio2") del curso de lecturas realizados

function readsProm (users) {
  let notas2 = 0
  // console.log(users[4].stats.exercises.percent)
  for (i = 0; i < users.length; i++) {
    notas2 += users[i].stats.reads.percent
  }
  let promedio2 = parseInt(notas2 / users.length)
  console.log(`Promedio completitud lecturas del curso:${promedio2}%`)
}
// ...................................................promedio("promedio3") del curso de quizz's realizados

function quizzProm (users) {
  let notas3 = 0
  for (i = 0; i < users.length; i++) {
    notas3 += users[i].stats.quizzes.percent
  }
  let promedio3 = parseInt(notas3 / users.length)
  console.log(`Promedio completitud quizzes del curso:${promedio3}%`)
}

// ................................................promedio("promedio4") del curso de puntajes del quizz's realizados

function quizzScoresProm (users) {
  let notas4 = 0
  
  for (i = 0; i < users.length; i++) {
    notas4 += users[i].stats.quizzes.scoreAvg
  }
  let promedio4 = parseInt(notas4 / users.length)
  console.log(`Promedio de puntajes de los quizzes del curso:${promedio4}%`)
}
// ...............................................................................................................

window.sortUsers = (users, orderBy, orderDirection) => {
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

window.filterUsers = (users, search ='luc') => {
  let nameFilter = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));
 console.log('filtro para buscar por nombre (case insensitive)')
  console.log(nameFilter)
  return nameFilter
};


// window.processCohortData = (options) => {

// }









