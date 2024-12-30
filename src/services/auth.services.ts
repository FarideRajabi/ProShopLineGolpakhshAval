
const AuthService = {
  ValidateLogin: "http://192.168.46.15:8098/api/Auth/ValidateUser?PhoneNumber=0",
  SendSms: "http://192.168.46.15:8098/api/Sms/SendSms",
  LoginBySms: "http://192.168.46.15:8098/api/Auth/LoginBySms",
  ProductSearch: "http://192.168.46.15:8098/api/Product/ProductSearch?SearchString",

  GetProductByBrandIdBySearch: "http://192.168.46.15:8098/api/Product/GetProductByBrandId?BrandId",
  GetProductByCategoryIdBySearch: "http://192.168.46.15:8098/api/Product/GetProductByCategoryId?CategoryId",
  GetProductBySupplierIdBySearch: "http://192.168.46.15:8098/api/Product/GetProductBySupplierId?SupplierId",

  GetProductByBrandId: "http://192.168.46.15:8098/api/Product/GetProductByBrandId?BrandId=",
  GetProductByCategoryId: "http://192.168.46.15:8098/api/Product/GetProductByCategoryId?CategoryId=",
  GetProductBySupplierId: "http://192.168.46.15:8098/api/Product/GetProductBySupplierId?SupplierId",

  CreateOrder: "http://192.168.46.15:8098/api/Order/CreateOrder",
  GetCart: "http://192.168.46.15:8098/api/Order/GetCart?BranchId=",
  SubmitOrderByCustomer: 'http://192.168.46.15:8098/api/Order/SubmitOrderByCustomer',
  GetOrders: 'http://192.168.46.15:8098/api/Order/GetOrders?',

  GetOrderItems: "http://192.168.46.15:8098/api/Order/GetOrderItems?OrderId=",
  ReOrder: "http://192.168.46.15:8098/api/Order/ReOrder",

  GetBrands: "http://192.168.46.15:8098/api/Brand/GetBrands?pageNo=1&pageSize=2000&BranchId=",
  GetProductCategory: 'http://192.168.46.15:8098/api/Category/GetProductCategory?pageNo=1&pageSize=2000&BranchId=',

  GetBrandsBySearch: "http://192.168.46.15:8098/api/Brand/GetBrands?search=",
  GetProductCategoryBySearch: 'http://192.168.46.15:8098/api/Category/GetProductCategory?search=',
  GetProductByBarcodeSearch: 'http://192.168.46.15:8098/api/Product/GetProductByBarcode?Barcode=',
  GetProductByTitleSearch: 'http://192.168.46.15:8098/api/Product/GetProductByTitle?Title=',

  GetBranches: 'http://192.168.46.15:8098/api/Branch/GetBranches',
  GetLastOrders: 'http://192.168.46.15:8098/api/Order/GetLastOrders',
  GetLastOrderByBranch: "http://192.168.46.15:8098/api/Order/GetLastOrderByBranch",

  GetPaymentType: "http://192.168.46.15:8098/api/Order/GetPaymentType",
  GetOrderStatusType: "http://192.168.46.15:8098/api/Order/GetOrderStatusType",

  CreateComment: "http://192.168.46.15:8098/api/Comment/CreateComment"
}

export default AuthService