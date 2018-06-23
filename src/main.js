async function cargarListaCohorts () {
  const url1 = 'http://127.0.0.1:8887/data/cohorts.json'
  const resp1 = await fetch(url1)
  const cohorts = await resp1.json()

  // ....................................nombre del courses:console.log(cohorts[31].coursesIndex.intro.title);
  // ..........................................creando lista desplegable con scroll de los cohorts consumidos
  let cohortsNombres = ''
  cohortsNombres += `<select id='selectCohorts'><option> Selecciona Cohorts </option>`
  cohorts.forEach(cohorts => {
    cohortsNombres += `<option >${cohorts.id}</option> 
              `
  })
  cohortsNombres += `</select>`
  recepcionCohorts.innerHTML = cohortsNombres
  // ............................................................leyendo el valor de la  seleccion del cohorts
  let seleccionCohort = document.getElementById('selectCohorts')
  seleccionCohort.addEventListener('change', () => {
    console.log(seleccionCohort.value)
    // ............................................................. Para seleccionar la opcion que contiene alumnas
    if (seleccionCohort.value === 'lim-2018-03-pre-core-pw') {
      const url = 'http://127.0.0.1:8887/data/cohorts/lim-2018-03-pre-core-pw/users.json'
      fetch(url)
        .then(resp => resp.json())
        .then(users => {
      
          // ............................................................................... Accesando a nombre de alumnas
          
          let alumnasNombres = ''
          alumnasNombres += `<select id='selectAlumnas'><option >Selecciona Alumna</option>`
          users.forEach(alumnas => {
            alumnasNombres += `<option value=${alumnas.id}>${alumnas.name}</option>`
          })
          alumnasNombres += `</select>`
          recepcionListadoAlumnas.innerHTML = alumnasNombres

          // ...................................................... leyendo el valor de una seleccion de alumnas por nombre
          let seleccionAlumna = document.getElementById('selectAlumnas')
          seleccionAlumna.addEventListener('change', () => {
            let alumnaId = seleccionAlumna.value
            console.log(alumnaId)
            // ..............................................................Quizas sirva para filter,era para buscar id antes
            // for (let indice in users){
            // let id = users[indice].name;
            // if(id == name){
            //     let index = indice;
            //     console.log(index)
            //  }
            // }

            const url2 = 'http://127.0.0.1:8887/data/cohorts/lim-2018-03-pre-core-pw/progress.json'
            fetch(url2)
              .then(resp2 => resp2.json())
              .then(progress => {
                // ..............................................................................seleccion del progreso individual
                let progresso = progress[alumnaId]
                informacionProgresoAlumna(progresso)
              })
          })
        })
    } else if (seleccionCohort.value !== 'lim-2018-03-pre-core-pw') {
      // ..........................................hacer un div none,block para mostrar esto,NO-OLVIDAR
      console.log('Lo sentimos no se encuentran datos disponibles.')
    }
  })
}


function informacionProgresoAlumna (progresso) {
  let usuario = {
    stats:
    {
      percent: percent(progresso),
      exercises:
      {
        total: 3,
        completed: exCompleted(progresso),
        percent: Math.round(exCompleted(progresso) * 100 / 3)
      },
      reads:
      {
        total: 11,
        completed: reCompleted(progresso),
        percent: Math.round(reCompleted(progresso) * 100 / 11)
      },
      quizzes: {
        total: 3,
        completed: quizCompleted(progresso),
        percent: Math.round(quizCompleted(progresso) * 100 / 3),
        scoreSum: parseInt(sumScores(progresso)),
        scoreAvg: Math.round(sumScores(progresso) / quizCompleted(progresso))
      }
    }
  }
  console.log(usuario)
  return usuario
}
//...........................................................................fx Complementarias,
function percent (progresso) {
  let progresso1 = progresso.intro.percent
  progressAlumna.innerHTML = progresso1
  console.log(`Progreso General : ${progresso1} %`)
  return progresso1 
}

function exCompleted (progresso) {
  const ruta = progresso.intro.units['02-variables-and-data-types']
  let ejerCompleted1 = ruta.parts['04-guided-exercises'].completed
  let ejerCompleted01 = ruta.parts['06-exercises'].exercises['01-coin-convert'].completed
  let ejerCompleted02 = ruta.parts['06-exercises'].exercises['02-restaurant-bill'].completed
  let sumExercises = (ejerCompleted1 + ejerCompleted01 + ejerCompleted02)
  //    console.log (sumExercises)
  return sumExercises
}

function reCompleted (progresso) {
  const ruta1 = progresso.intro.units['01-introduction']
  let read10 = ruta1.parts['00-welcome-and-orientation'].completed
  let read11 = ruta1.parts['01-growth-mindset'].completed
  let read12 = ruta1.parts['02-why-learn-to-code'].completed
  let read13 = ruta1.parts['03-your-first-website'].completed

  const ruta2 = progresso.intro.units['02-variables-and-data-types']
  let read20 = ruta2.parts['00-values-data-types-and-operators'].completed
  let read21 = ruta2.parts['01-variables'].completed
  let read22 = ruta2.parts['02-self-learning-MDN'].completed
  let read23 = ruta2.parts['03-comments'].completed

  const ruta3 = progresso.intro.units['03-ux-design']
  let read30 = ruta3.parts['00-development-team'].completed
  let read31 = ruta3.parts['01-ux-design'].completed
  let read32 = ruta3.parts['02-ux-design-vs-ui-design'].completed

  let subTotal = (read10 + read11 + read12 + read13 + read20 + read21 + read22 + read23 + read30 + read31 + read32)
  return subTotal
}

let quizz1, quizz2, quizz3 = ''
function quizCompleted (progresso) {
  quizz1 = progresso.intro.units['01-introduction'].parts['04-quiz'].completed
  quizz2 = progresso.intro.units['02-variables-and-data-types'].parts['05-quiz'].completed
  quizz3 = progresso.intro.units['03-ux-design'].parts['03-quiz'].completed
  let quizSubTotal = (quizz1 + quizz2 + quizz3)
  return quizSubTotal
}

function sumScores (progresso) {
  let score1, score2, score3 = ''
  if (quizz1 == 1) {
    score1 = progresso.intro.units['01-introduction'].parts['04-quiz'].score
  } else {
    score1 == 0
  };
  if (quizz2 == 1) {
    score2 = progresso.intro.units['02-variables-and-data-types'].parts['05-quiz'].score
  } else {
    score2 == 0
  };
  if (quizz3 == 1) {
    score3 = progresso.intro.units['03-ux-design'].parts['03-quiz'].score
  } else {
    score3 == 0
  };
  let sumPuntajes = (score1 + score2 + score3)
  return sumPuntajes
}
