// Skeleton per section — masing-masing hanya untuk satu section

export function SkeletonHero() {
  return (
    <div style={{padding:'72px 0 64px',borderBottom:'1px solid #e4ddd6'}}>
      <div style={{maxWidth:960,margin:'0 auto',padding:'0 24px',display:'grid',gridTemplateColumns:'1fr auto',gap:48,alignItems:'start'}}>
        <div>
          <span className="sk" style={{width:200,height:13,marginBottom:20,display:'block'}}/>
          <span className="sk" style={{width:'68%',height:62,marginBottom:10,display:'block'}}/>
          <span className="sk" style={{width:'48%',height:62,marginBottom:28,display:'block'}}/>
          {[100,95,88,93,76].map((w,i) => <span key={i} className="sk" style={{width:`${w}%`,height:14,marginBottom:8,display:'block'}}/>)}
          <div style={{height:32}}/>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:36}}>
            {[120,88,78,90,102].map((w,i) => <span key={i} className="sk" style={{width:w,height:30,borderRadius:20}}/>)}
          </div>
          <div style={{display:'flex',gap:12,marginBottom:20}}>
            <span className="sk" style={{width:220,height:50,borderRadius:8}}/>
            <span className="sk" style={{width:140,height:50,borderRadius:8}}/>
          </div>
          <div style={{display:'flex',gap:10}}>
            <span className="sk" style={{width:100,height:36,borderRadius:7}}/>
            <span className="sk" style={{width:100,height:36,borderRadius:7}}/>
          </div>
        </div>
        <div style={{background:'#fff',border:'1px solid #e4ddd6',borderRadius:12,padding:'28px 24px',minWidth:210,display:'flex',flexDirection:'column',gap:20}}>
          {[0,1,2].map(i => (
            <div key={i} style={{textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
              {i > 0 && <div style={{height:1,background:'#e4ddd6',width:'100%',marginBottom:12}}/>}
              <span className="sk" style={{width:64,height:44}}/>
              <span className="sk" style={{width:80,height:11}}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SkeletonSkills() {
  return (
    <div style={{padding:'72px 0',borderBottom:'1px solid #e4ddd6',background:'#fff'}}>
      <div style={{maxWidth:960,margin:'0 auto',padding:'0 24px'}}>
        <span className="sk" style={{width:80,height:11,marginBottom:8,display:'block'}}/>
        <span className="sk" style={{width:240,height:36,marginBottom:40,display:'block'}}/>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{background:'#fff',border:'1px solid #e4ddd6',borderRadius:10,padding:'18px 20px'}}>
              <span className="sk" style={{width:'40%',height:16,marginBottom:12,display:'block'}}/>
              <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                {[70,85,65,90,75].slice(0,3+(i%3)).map((w,j) => <span key={j} className="sk" style={{width:w,height:26,borderRadius:4}}/>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SkeletonExperience() {
  return (
    <div style={{padding:'72px 0',borderBottom:'1px solid #e4ddd6'}}>
      <div style={{maxWidth:960,margin:'0 auto',padding:'0 24px'}}>
        <span className="sk" style={{width:120,height:11,marginBottom:8,display:'block'}}/>
        <span className="sk" style={{width:260,height:36,marginBottom:40,display:'block'}}/>
        {[0,1,2].map(i => (
          <div key={i} style={{display:'grid',gridTemplateColumns:'155px 1fr',padding:'36px 0',borderBottom: i < 2 ? '1px solid #e4ddd6' : 'none'}}>
            <div>
              <span className="sk" style={{width:110,height:14,marginBottom:6,display:'block'}}/>
              <span className="sk" style={{width:70,height:12,display:'block'}}/>
            </div>
            <div>
              <span className="sk" style={{width:140,height:12,marginBottom:6,display:'block'}}/>
              <span className="sk" style={{width:'55%',height:26,marginBottom:14,display:'block'}}/>
              {[100,92,82].map((w,j) => <span key={j} className="sk" style={{width:`${w}%`,height:13,marginBottom:6,display:'block'}}/>)}
              <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:10}}>
                {[70,80,65,88].slice(0,3+(i%2)).map((w,j) => <span key={j} className="sk" style={{width:w,height:24,borderRadius:4}}/>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SkeletonProjects() {
  return (
    <div style={{padding:'72px 0',borderBottom:'1px solid #e4ddd6',background:'#fff'}}>
      <div style={{maxWidth:960,margin:'0 auto',padding:'0 24px'}}>
        <span className="sk" style={{width:80,height:11,marginBottom:8,display:'block'}}/>
        <span className="sk" style={{width:320,height:36,marginBottom:40,display:'block'}}/>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:18}}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{background:'#fff',border:'1px solid #e4ddd6',borderRadius:10,overflow:'hidden'}}>
              <span className="sk" style={{width:'100%',height:160,borderRadius:0,display:'block'}}/>
              <div style={{padding:'20px 20px 22px'}}>
                <span className="sk" style={{width:'72%',height:22,marginBottom:10,display:'block'}}/>
                <span className="sk" style={{width:'100%',height:13,marginBottom:6,display:'block'}}/>
                <span className="sk" style={{width:'83%',height:13,marginBottom:16,display:'block'}}/>
                <div style={{display:'flex',gap:6,marginBottom:14}}>
                  {[70,80,90].map((w,j) => <span key={j} className="sk" style={{width:w,height:24,borderRadius:4}}/>)}
                </div>
                <div style={{display:'flex',gap:14}}>
                  <span className="sk" style={{width:75,height:14}}/>
                  <span className="sk" style={{width:60,height:14}}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SkeletonCTA() {
  return (
    <div style={{padding:'80px 0',background:'#1a1612'}}>
      <div style={{maxWidth:960,margin:'0 auto',padding:'0 24px',display:'grid',gridTemplateColumns:'1fr auto',gap:48,alignItems:'center'}}>
        <div>
          <span className="sk-dark" style={{width:130,height:11,marginBottom:14,display:'block'}}/>
          <span className="sk-dark" style={{width:'60%',height:44,marginBottom:10,display:'block'}}/>
          <span className="sk-dark" style={{width:'50%',height:44,marginBottom:20,display:'block'}}/>
          <span className="sk-dark" style={{width:'88%',height:13,marginBottom:6,display:'block'}}/>
          <span className="sk-dark" style={{width:'72%',height:13,display:'block'}}/>
        </div>
        <div style={{minWidth:240,display:'flex',flexDirection:'column',gap:12,alignItems:'center'}}>
          <span className="sk-dark" style={{width:'100%',height:54,borderRadius:10,display:'block'}}/>
          <span className="sk-dark" style={{width:130,height:13,display:'block'}}/>
          <span className="sk-dark" style={{width:150,height:13,display:'block'}}/>
        </div>
      </div>
    </div>
  )
}

export function SkeletonFooter() {
  return (
    <div style={{padding:'26px 0',background:'#1a1612',borderTop:'1px solid rgba(255,255,255,.07)'}}>
      <div style={{maxWidth:960,margin:'0 auto',padding:'0 24px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span className="sk-dark" style={{width:200,height:16}}/>
        <div style={{display:'flex',gap:18}}>
          {[60,65,80].map((w,i) => <span key={i} className="sk-dark" style={{width:w,height:12}}/>)}
        </div>
      </div>
    </div>
  )
}
