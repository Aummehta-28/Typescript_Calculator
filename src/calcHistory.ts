const historyList = document.querySelector<HTMLDivElement>(".list")


type HistoryItem={
    expression:string,
    result:number
}

export function saveHistory(expression: string, result: number): void {

    try {
        let history:HistoryItem[]=[]
        const data = sessionStorage.getItem("History");
        if (data != null) {
            history = JSON.parse(data) ;
        }
        history.push({
            expression: expression,
            result: result
        });

        sessionStorage.setItem("History", JSON.stringify(history));
    } catch (error) {

        console.log("Save history error:", error);
    }

}

export function renderHistory(): void {
    try {
        if(!historyList) throw new Error (".hisory not found in DOM")
        let history:HistoryItem[]=[]
        const data = sessionStorage.getItem("History");
        if (data != null) {
             history = JSON.parse(data) ;
        }
        historyList.innerHTML = "";
        history.forEach((item:{ expression: string; result: number })=> {
            const div = document.createElement("div");
            div.className = "list-item";
            div.textContent = `${item.expression} = ${item.result}`;
            historyList.appendChild(div);

        });
    } catch (error) {
        console.log("Render History Error ", error)
    }

}

export function clearHistory() :void{

    sessionStorage.setItem("History", JSON.stringify([]));
    renderHistory();
}
