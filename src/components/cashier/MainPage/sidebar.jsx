function Sidebar({
  variants,
  voucherCode,
  handleVoucherCodeChange,
  handleCharge,
}) {
  return (
    <div style={{ border: '1px solid black', padding: '16px' }}>
      <h2>Order Details</h2>
      <ul>
        {variants.map((variant) => (
          <li key={variant.variantId}>{JSON.stringify(variant)}</li>
        ))}
      </ul>
      <label htmlFor="voucher-code">Voucher Code</label>
      <input
        id="voucher-code"
        type="text"
        value={voucherCode}
        onChange={handleVoucherCodeChange}
        style={{ backgroundColor: 'grey' }}
      />
      <button type="button" onClick={handleCharge}>
        Charge
      </button>
    </div>
  );
}

export default Sidebar;
