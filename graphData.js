/**Function to read the data */
function readData(file, id){
    d3.csv(file).then((data) => graph(data, id));
}

function graph(data, id){
    const numCountries = 10;
    let width = window.innerWidth-150;
    let height = window.innerHeight-150;
    console.log(data[0])

    const dates = Object.keys(data[0])
    .map((date) => (new Date(date)).getTime())
    .filter(Boolean)
    console.log(dates)
    const startDate = new Date(Math.min(...dates))
    const endDate = new Date(Math.max(...dates))
     console.log(`Start date: ${startDate} end date: ${endDate}`)

      
     const lastDate = (endDate.getMonth() + 1) + "/" + 
                      endDate.getDate() + "/" +
                      (endDate.getFullYear() + "").slice(-2)
    console.log(lastDate)
    console.log(data[0][lastDate])

    data.sort((a, b) =>
        (parseInt(a[lastDate]) < parseInt(b[lastDate])) ? 1 : -1)
    data = data.slice(0, numCountries)

    console.log(data)

    const casesData = data.map((d)=> 
        Object.entries(d)
            .filter((e) => (new Date(e[0]).getTime()))
            .map((e)=> [(new Date(e[0])).getTime(), parseInt(e[1])]))

    console.log(casesData)        

    const cases = 
        casesData.flatMap((p)=> p.map((c) => c[1]))
    
    const maxCases = Math.max(...cases)
    console.log("Max cases: ", maxCases)

    /**Create graph */
    let svg = d3.select(id)
        .append("svg")
        .attr("width", width+50)
        .attr("height", height+50)
        .attr("transform", "translate(50, 50)")
}