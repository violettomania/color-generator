// -14, ±17, ±19 - down
// +12 - up

export default function App() {
  return (
    <main>
      <section className='container'>
        <h4>color generator</h4>
        <form className='color-form'>
          <input type='color' value='#eed7d1' onChange={() => {}} />
          <input
            type='text'
            placeholder='#f15025'
            value='#eed7d1'
            onChange={() => {}}
          />
          <button
            className='btn'
            type='submit'
            style={{ background: 'rgb(238, 215, 209)' }}
          >
            submit
          </button>
        </form>
      </section>
      <section className='colors'>
        <article
          className='color false'
          style={{ backgroundColor: 'rgb(255, 255, 255)' }}
        >
          <p className='percent-value'>100%</p>
          <p className='color-value'>#ffffff</p>
        </article>
        <article
          className='color color-light'
          style={{ backgroundColor: 'rgb(214, 194, 188)' }}
        >
          <p className='percent-value'>10%</p>
          <p className='color-value'>#d6c2bc</p>
        </article>
      </section>
      <div className='Toastify'></div>
    </main>
  );
}
