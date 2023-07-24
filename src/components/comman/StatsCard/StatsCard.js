import React from 'react'
import Index from '../..';

const StatsCard = (props) =>{
    let state = props.state
    return(
        <>
<Index.Card className='p-4'>
    <div>
        <Index.Typography className='text-xl'>
{state.title}
        </Index.Typography>
    </div>
    <div className=''>
        <Index.Typography>
            {state.value}
        </Index.Typography>
    </div>

</Index.Card>
        </>
    )
}

export default StatsCard;
