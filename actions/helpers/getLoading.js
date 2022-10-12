const getLoading = (total, records) => {

    if(records<=(90*total/100) && !por90){
        por90 = true
        console.log('10%')
        return
    }
    if(records<=(80*total/100) && !por80){
        por80 = true
        console.log('20%')
        return
    }
    if(records<=(70*total/100) && !por70){
        por70 = true
        console.log('30%')
        return
    }
    if(records<=(60*total/100) && !por60){
        por60 = true
        console.log('40%')
        return
    }
    if(records<=(50*total/100) && !por50){
        por50 = true
        console.log('50%')
        return
    }
    if(records<=(40*total/100) && !por40){
        por40 = true
        console.log('60%')
        return
    }
    if(records<=(30*total/100) && !por30){
        por30 = true
        console.log('70%')
        return
    }
    if(records<=(20*total/100) && !por20){
        por20 = true
        console.log('80%')
        return
    }
    if(records<=(10*total/100) && !por10){
        por10 = true
        console.log('90%')
        return
    }
}

module.exports = {getLoading}