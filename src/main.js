
function generarTablaUsuarios(users){
  let tablaDeUsers=''
      tablaDeUsers+=`<table class='TablaOrden'>`
      tablaDeUsers+=`<tr>
                      <th>Nombre</th>
                      <th>Completitud Curso </th>
                      <th>Ejercicios Completados </th>
                      <th>Lecturas Completados </th>
                      <th>Quizzes Completados</th>
                      <th>Quizzes PuntajesPromedio </th>
                    </tr>`           
      users.forEach((user) => {    
      tablaDeUsers+=`<tr>
                      <td class='name'>${user.name.toLowerCase()}</td>     
                      <td class='percent'>${user.stats.percent} %</td>
                      <td class='exercisesCompleted'>${user.stats.exercises.percent} %</td>
                      <td class='readsCompleted'>${user.stats.reads.percent} % </td>
                      <td class='quizzesCompleted'>${user.stats.quizzes.percent} %</td>
                      <td class='quizzesScoreAvg'>${user.stats.quizzes.scoreAvg} %</td>
                     </tr>`
        })
      tablaDeUsers+=`<table>`
      contenedorTableUsuarias.innerHTML=tablaDeUsers

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

// ........................................................fx's para componer fxs del data.js principales ;cus=CompuUsersStats
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

