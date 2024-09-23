
const Network = ({status}) => {
    return (
        <>
            <div>
                {
                    status == 'offline' ?
                        <div className="p-2  text-black rounded bg-amber-400">Offline</div>
                        :
                        <div className="p-2  text-black rounded bg-green-300">Online</div>
                }
            </div>
        </>
    );
}

export default Network;



// timer off. when offline send msg to SW. 
// when SW done with uploads set timer to off. 
//from FE again turn it on. 

// make a class/ write tyhe loop inside.
// make a method addeventlietener.Networkfrom that get the callback to the Array 
// as
