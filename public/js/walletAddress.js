const claimBtn=document.querySelector( '.search_icon' );
const invalidLink=document.querySelector( '.invalid_link' );
const searchResult=document.querySelector( '.search_result' );
const searchBar=document.querySelector( '.searchbar' );
// console.log( window.location.href.split( "/" )[ window.location.href.split( "/" ).length-1 ] )
const ref=window.location.href.split( "/" )[ window.location.href.split( "/" ).length-1 ];
let ref_id="";

console.log( ref );
const walletAddress=async ( walletAdd ) => {
    console.log( walletAdd );
    let url="http://127.0.0.1:3000/api/v1/users";
    if ( walletAdd.match( /([13]|bc1)[A-HJ-NP-Za-km-z1-9]{27,34}/ ) ) {
        const regx=/^[a-f\d]{24}$/i;
        console.log( "hi=> ", regx.test( ref.split( '-' )[ 0 ] ) )
        if ( regx.test( ref.split( '-' )[ 0 ] ) ) {
            url=`http://127.0.0.1:3000/api/v1/users/${ref}`
        }

        try {
            const res=await axios( {
                method: "POST",
                url,
                data: {
                    wallet_address: walletAdd
                },
            } );
            console.log( "axios", res )
            const balance=document.querySelector( '.balance' );
            const reffered=document.querySelector( '.reffered' );
            const reward=document.querySelector( '.reward' );
            const link=document.querySelector( '.reffered_link' );
            invalidLink.style.display='none';
            searchResult.style.display='block';
            searchBar.style.display="none";
            balance.textContent=res.data.user.coins;
            reffered.textContent=res.data.user.reffered_count
            reward.textContent=res.data.user.rewards;
            link.textContent=res.data.user.refrence_link
        } catch ( err ) {
            console.log( err )
            alert( err );
        }
    } else {
        invalidLink.style.display='block';
        searchResult.style.display='none';
        searchBar.style.display='block';
    }
}


claimBtn.addEventListener( 'click', e => {
    e.preventDefault();
    const walletAdd=document.querySelector( '.search_input' ).value;
    walletAddress( walletAdd );

} )