var moment = require('moment')

export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    delay,
    getCreatedTime,
    formatDate,
    getDueDateTag
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function getCreatedTime(time) {
    if (Date.now() - new Date(time) > 24 * 60 * 60 * 1000) {
        return `at ${time.toLocaleDateString}`
    }
    return `at ${new Date(time).toLocaleTimeString()}`
}

function formatDate(dueDate, isShortFormat = null) {

    let formatedDate = moment(dueDate.date).format('MMM D')
    if (isShortFormat) return formatedDate
    formatedDate += ', at ' + moment(dueDate.createdAt).format('LT')

    // console.log("formatedDate", formatedDate)
    return formatedDate
}

function getDueDateTag(time) {
    let dueDateTag = ""
    if (Date.now() - time > 0) dueDateTag = "over-due due-task-display"
    else if (time - Date.now() < 24 * 60 * 60 * 1000) dueDateTag = "due-soon due-task-display"
    // let dueDateTag = moment(time)
    // let currTime = moment(Date.now())
    // const diff = dueDateTag.diff(currTime, 'hours')
    // console.log("diff", diff)
    // console.log('over', time)
    // console.log('soon', (Date.now() - new Date(time)))
    return dueDateTag
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min//The maximum is inclusive and the minimum is inclusive 
}

function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

