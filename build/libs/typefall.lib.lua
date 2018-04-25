--[[

    TypeFall Standard Library

]]

std = {}

std.contains = function(tbl, value)
    for i, v in ipairs(tbl) do
        if (v == value) then
            return true
        end
    end
    
    return false
end
