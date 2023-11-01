const terms = ["Fall", "Winter", "Spring"];

const MenuButton = ({term, selection, setSelection}) => (
  <div style={{ display: 'inline-block', margin: '0.5rem' }}> 
    <input 
      type="radio" 
      id={term} 
      style={{ display: 'none' }}
      checked={term === selection} 
      onChange={() => setSelection(term)} 
    />
    <label 
      style={{
        padding: '8px 16px',
        backgroundColor: term === selection ? 'purple' : 'gray', 
        borderRadius: '4px',
      }} 
      htmlFor={term}
      data-cy={term}
    >
      { term }
    </label>
  </div>
);

const MenuSelector = ({selection, setSelection}) => (
  <div className="btn-group d-flex justify-content-center">
    { 
      terms.map(term => 
        <MenuButton key={term} term={term} selection={selection} setSelection={setSelection} />
      )
    }
  </div>
);

const TermSelector = ({term, setTerm}) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      marginTop: '20px'
    }}>
      <MenuSelector selection={term} setSelection={setTerm} />
    </div>
  );
}

export default TermSelector;
