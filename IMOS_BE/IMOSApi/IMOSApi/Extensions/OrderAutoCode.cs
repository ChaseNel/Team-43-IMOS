using IMOSApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace IMOSApi.Extensions
{
    public class OrderAutoCode
    {
        private readonly IMOSContext _context;
        private int _start;


        public string GenerateOrderNumber()
        {
            var autoCode = "";
            var lastCode = _context.Orderlines.Max(item => item.OrderNumber);
            if (lastCode != null)
            {
                var resultString = Regex.Match(lastCode, @"\d+").Value;
                _start = Int32.Parse(resultString);

                autoCode = "OrderNumber" + (_start + 1).ToString("000");
            }
            autoCode = "OrderNumber" + (_start + 1).ToString("000");
            return autoCode;
        }

    }
}
