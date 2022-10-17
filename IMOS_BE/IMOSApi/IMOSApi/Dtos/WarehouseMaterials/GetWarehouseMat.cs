namespace IMOSApi.Dtos.WarehouseMaterials
{
    public class GetWarehouseMat
    {
        public int WareHouseId { get; set; }
        public int MaterialId { get; set; }
        public string WareHouseName { get; set; }
        public string MaterialName { get; set; }
        public string MaterialType { get; set; }
        public string MaterialDesciption { get; set; }
        public int QuantityONHand { get; set; }
    }
}
