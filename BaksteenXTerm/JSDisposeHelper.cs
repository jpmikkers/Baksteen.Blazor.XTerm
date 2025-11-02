namespace BaksteenXTerm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.JSInterop;

internal class JSDisposeHelper : IAsyncDisposable
{
    private readonly IJSObjectReference _jsObjectReference;

    public JSDisposeHelper(IJSObjectReference jsObjectReference)
    {
        _jsObjectReference = jsObjectReference;
    }

    public async ValueTask DisposeAsync()
    {
        try
        {
            await _jsObjectReference.InvokeVoidAsync("dispose");
            await _jsObjectReference.DisposeAsync();
        }
        catch (JSDisconnectedException)
        {
        }
    }
}
