using System.ComponentModel.DataAnnotations;

namespace IMOSApi.Dtos.Vehicle
{
    public class UploadImageDto
    {
        [Required]
        public string imageUrl { get; set; }
    }
}
